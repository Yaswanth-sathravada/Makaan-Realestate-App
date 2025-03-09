package com.estate.service;

import com.estate.entity.ProductDto;
import com.estate.entity.ProductEntity;

import java.util.List;

public interface ProductService {
    boolean addProduct(ProductEntity product);
    List<ProductEntity> getAllProducts();
    ProductEntity getProductById(Long pid);
    List<ProductDto> getProductsByUserId(int userId);
    List<ProductEntity> getProductsByCategory(String category);
    void updateProduct(ProductEntity product, Long pid);
    void deleteByProductId(Long pid);
    List<ProductEntity> searchByAddress(String address);
    List<ProductEntity> searchByPname(String pname);
    List<ProductEntity> searchByPrice(Double price);
    List<ProductEntity> searchByAddressCategoryPrice(String address,String category,Double price);
    List<ProductEntity> searchByAddressCategory(String address,String category);
    List<ProductEntity> searchByAddressPrice(String address,Double price);
    List<ProductEntity> searchByCategoryPrice(String category,Double price);
}
