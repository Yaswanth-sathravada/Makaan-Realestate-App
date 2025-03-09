package com.estate.repo;

import com.estate.entity.ProductEntity;
import com.estate.entity.UserProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProductRepo extends CrudRepository<UserProduct,Long> {
    void deleteByProduct(ProductEntity product);
    List<UserProduct> findByProductPid(Long pid);
}