package com.estate.repo;

import com.estate.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends CrudRepository<ProductEntity,Long> {
    List<ProductEntity> findByCategory(String category);
    ProductEntity findBypid(Long pid);
    List<ProductEntity> findByAddressContaining(String address);
    List<ProductEntity> findByPnameContaining(String pname);
    List<ProductEntity> findByPriceLessThanEqual(Double price);
    List<ProductEntity> findByAddressContainingAndCategoryContainingAndPriceLessThanEqual(String address,String category,Double price);
    List<ProductEntity> findByAddressContainingAndPriceLessThanEqual(String address,Double price);
    List<ProductEntity> findByAddressContainingAndCategoryContaining(String address,String category);
    List<ProductEntity> findByCategoryContainingAndPriceLessThanEqual(String category,Double price);
}
