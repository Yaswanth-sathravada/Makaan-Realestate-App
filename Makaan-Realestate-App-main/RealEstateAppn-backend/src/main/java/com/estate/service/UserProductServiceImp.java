package com.estate.service;

import com.estate.entity.ProductEntity;
import com.estate.entity.UserProduct;
import com.estate.entity.UsersEntity;
import com.estate.exception.ProductNotFoundException;
import com.estate.repo.ProductRepo;
import com.estate.repo.UserProductRepo;
import com.estate.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserProductServiceImp implements UserProductService{

    @Autowired
    private UserProductRepo userProductRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private UserRepo userRepo;

    private static final Logger logger = LoggerFactory.getLogger(UserProductServiceImp.class);

    @Autowired
    private JavaMailSender mailSender;


    @Override
    public void addUserProduct(UserProduct userProduct) {
        try {
            userProductRepo.save(userProduct);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add user product: " + e.getMessage(), e);
        }
    }

    @Override
    public void addSelectedProductsToUser(UsersEntity user, List<ProductEntity> products) {
        for (ProductEntity product : products) {
            ProductEntity existingProduct;
            if (product.getPid() != null) {
                existingProduct = productRepo.findById(product.getPid())
                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + product.getPid()));
            } else {
                existingProduct = productRepo.save(product);
            }

            UserProduct userProduct = new UserProduct();
            userProduct.setUser(user);
            userProduct.setProduct(existingProduct);
            userProduct.setUsername(user.getUsername());
            userProduct.setProductName(existingProduct.getPname());
            userProduct.setProductPrice(existingProduct.getPrice());

            addUserProduct(userProduct);

            sendEmailToSeller(user, existingProduct);
        }
    }

    @Override
    @Transactional
    public void deleteUserProductByProductId(Long pid) {
        try {
            List<UserProduct> userProducts = userProductRepo.findByProductPid(pid);

            if (userProducts.isEmpty()) {
                throw new ProductNotFoundException("User products with Product ID " + pid + " not found.");
            }

            for (UserProduct userProduct : userProducts) {
                userProductRepo.delete(userProduct);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Failed to delete products with Product ID " + pid, ex);
        }
    }


    private void sendEmailToSeller(UsersEntity user, ProductEntity product) {
        try {
            UsersEntity seller = userRepo.findById(product.getSellerId())
                    .orElseThrow(() -> new RuntimeException("Seller not found with id: " + product.getSellerId()));

            if(seller == null) {
                logger.error("Seller not found with id: " + product.getSellerId());
                return;
            }

            String sellerEmail = seller.getEmail();

            if(sellerEmail == null || sellerEmail.isEmpty()) {
                logger.error("Email not found for seller with id: " + product.getSellerId());
                return;
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(sellerEmail);
            message.setSubject("A user is interested in your property: " + product.getPname());
            message.setText("User details:\n" +
                    "Name: " + user.getUsername() + "\n" +
                    "Email: " + user.getEmail() + "\n" +
                    "Mobile: " + user.getMobile() + "\n" +
                    "Product details:\n" +
                    "Product Name: " + product.getPname() + "\n" +
                    "Price: " + product.getPrice() + "\n" +
                    "Category: " + product.getCategory() + "\n" +
                    "Address: " + product.getAddress() + "\n" +
                    "Contact the above mail or mobile number for more details"
            );

            mailSender.send(message);
        } catch (Exception ex) {
            logger.error("Error sending email to seller: " + ex.getMessage(), ex);
        }
    }


}
