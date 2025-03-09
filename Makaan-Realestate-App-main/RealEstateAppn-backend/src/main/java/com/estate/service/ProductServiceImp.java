package com.estate.service;

import com.estate.entity.ProductDto;
import com.estate.entity.ProductEntity;
import com.estate.entity.UsersEntity;
import com.estate.exception.ProductNotFoundException;
import com.estate.repo.ProductRepo;
import com.estate.repo.UserProductRepo;
import com.estate.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements ProductService{

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserProductRepo userProductRepo;

    @Override
    public boolean addProduct(ProductEntity product) {
       try{
           productRepo.save(product);
           return true;
       }catch (Exception ex){
           ex.printStackTrace();
           return false;
       }
    }

    @Override
    public List<ProductEntity> getAllProducts() {
        try{
            return (List<ProductEntity>) productRepo.findAll();
        }
        catch (Exception ex){
            throw new RuntimeException("Error fetching products",ex);
        }
    }

    @Override
    public ProductEntity getProductById(Long pid) {
        return productRepo.findById(pid).orElse(null);
    }

    @Override
    public List<ProductDto> getProductsByUserId(int userId) {
        UsersEntity user = userRepo.findByUserId(userId);
        if(user!=null){
            return user.getSelectedProducts().stream()
                    .map(userProduct -> {
                        ProductEntity product = userProduct.getProduct();
                        ProductDto productDto = new ProductDto();
                        productDto.setPid(product.getPid());
                        productDto.setPname(product.getPname());
                        productDto.setPrice(product.getPrice());
                        productDto.setImageLink(productDto.getImageLink());
                        productDto.setCategory(product.getCategory());
                        productDto.setAddress(product.getAddress());
                        productDto.setFacing(product.getFacing());
                        productDto.setFurnished(product.getFurnished());
                        productDto.setStatus(product.getStatus());
                        productDto.setBedrooms(product.getBedrooms());
                        productDto.setBathrooms(product.getBathrooms());
                        productDto.setSize(product.getSize());
                        productDto.setType(product.getType());
                        return productDto;
                    })
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public List<ProductEntity> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    @Override
    public void updateProduct(ProductEntity product, Long pid) {
        ProductEntity oldProduct = productRepo.findBypid(pid);
        if(oldProduct == null) throw new ProductNotFoundException("Product with ID " + pid + " not found");

        if(product.getPname()!=null && !product.getPname().isEmpty()){
            oldProduct.setPname(product.getPname());
        }

        if(product.getPrice()!=null){
            oldProduct.setPrice(product.getPrice());
        }

        if (product.getImageLink() != null && !product.getImageLink().isEmpty()) {
            oldProduct.setImageLink(product.getImageLink());
        }

        if (product.getCategory() != null && !product.getCategory().isEmpty()) {
            oldProduct.setCategory(product.getCategory());
        }

        if (product.getAddress() != null && !product.getAddress().isEmpty()) {
            oldProduct.setAddress(product.getAddress());
        }

        if (product.getFacing() != null && !product.getFacing().isEmpty()) {
            oldProduct.setFacing(product.getFacing());
        }

        if (product.getFurnished() != null && !product.getFurnished().isEmpty()) {
            oldProduct.setFurnished(product.getFurnished());
        }

        if (product.getStatus() != null && !product.getStatus().isEmpty()) {
            oldProduct.setStatus(product.getStatus());
        }

        if (product.getSize() != null) {
            oldProduct.setSize(product.getSize());
        }

        if (product.getType() != null && !product.getType().isEmpty()) {
            oldProduct.setType(product.getType());
        }

        if (product.getSellerId() != null) {
            oldProduct.setSellerId(product.getSellerId());
        }

        productRepo.save(oldProduct);
    }

    @Override
    @Transactional
    public void deleteByProductId(Long pid) {
        try {
            ProductEntity product = productRepo.findById(pid)
                    .orElseThrow(() -> new ProductNotFoundException("Product with ID " + pid + " not found."));

            userProductRepo.deleteByProduct(product);

            productRepo.delete(product);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Failed to delete product with ID " + pid, ex);
        }
    }

    @Override
    public List<ProductEntity> searchByAddress(String address) {
        try{
            return productRepo.findByAddressContaining(address);
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Failed to fetch products"+ex);
        }
    }

    @Override
    public List<ProductEntity> searchByPname(String pname) {
        try{
            return productRepo.findByPnameContaining(pname);
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Failed to fetch products"+ex);
        }
    }

    @Override
    public List<ProductEntity> searchByPrice(Double price) {
        try{
            return productRepo.findByPriceLessThanEqual(price);
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Failed to fetch products"+ex);
        }
    }

    @Override
    public List<ProductEntity> searchByAddressCategoryPrice(String address, String category, Double price) {
        try{
            return productRepo.findByAddressContainingAndCategoryContainingAndPriceLessThanEqual(address, category, price);
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Failed to fetch products"+ex);
        }
    }

    @Override
    public List<ProductEntity> searchByAddressCategory(String address, String category) {
        try{
            return productRepo.findByAddressContainingAndCategoryContaining(address, category);
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Failed to fetch products"+ex);
        }
    }

    @Override
    public List<ProductEntity> searchByAddressPrice(String address, Double price) {
        try{
            return productRepo.findByAddressContainingAndPriceLessThanEqual(address, price);
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Failed to fetch products"+ex);
        }
    }

    @Override
    public List<ProductEntity> searchByCategoryPrice(String category, Double price) {
        try{
            return productRepo.findByCategoryContainingAndPriceLessThanEqual(category, price);
        }catch (Exception ex){
            ex.printStackTrace();
            throw new RuntimeException("Failed to fetch products"+ex);
        }
    }
}
