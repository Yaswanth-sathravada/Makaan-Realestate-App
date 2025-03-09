package com.estate.controller;

import com.estate.entity.ProductDto;
import com.estate.entity.ProductEntity;
import com.estate.service.ProductService;
import com.estate.service.UserProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:4200"})
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @Autowired
    private UserProductService userProductService;

    @GetMapping("/welcome")
    public String welcome(){
        return "Hello World!";
    }

    @PostMapping("/addProd")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SELLER')")
    public ResponseEntity<String> addProduct(@RequestBody ProductEntity product){
        boolean addProduct = productService.addProduct(product);
        if(addProduct){
            return ResponseEntity.ok("{\"status\":\"Product added successfully!!\"}");
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\":\"Failed to add,check for errors!\"}");
        }
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductEntity>> getAllProducts(){
        try {
            List<ProductEntity> allProducts = productService.getAllProducts();
            return ResponseEntity.ok(allProducts);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/product/{pid}")
    public ResponseEntity<ProductEntity> getProduct(@PathVariable Long pid){
        try{
            ProductEntity product = productService.getProductById(pid);
            if (product != null) {
                return ResponseEntity.ok(product);
            } else {
                return ResponseEntity.notFound().build();
            }
        }catch (Exception ex){
            logger.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{userId}/products")
    public ResponseEntity<List<ProductDto>> getProductsByUserId(@PathVariable int userId){
        List<ProductDto> productDTOs = productService.getProductsByUserId(userId).stream()
                .map(product -> new ProductDto(product.getPid(), product.getPname(), product.getPrice(), product.getAddress(), product.getImageLink(), product.getCategory(), product.getFacing(), product.getFurnished(), product.getStatus(),product.getBedrooms(),product.getBathrooms(), product.getSize(), product.getType()))
                .collect(Collectors.toList());

        if(!productDTOs.isEmpty()){
            return new ResponseEntity<>(productDTOs, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/user/{userId}/products/deleteProductByProductId/{pid}")
    public ResponseEntity<String> deleteUserProductByProductId(@PathVariable Long pid) {
        try {
            userProductService.deleteUserProductByProductId(pid);
            return ResponseEntity.ok("{\"status\":\"Product deleted successfully!!\"}");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\":\"Failed to delete product\"}");
        }
    }


    @PutMapping("updateProduct/{pid}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SELLER')")
    public ResponseEntity<String> updateProduct(@RequestBody ProductEntity product, @PathVariable Long pid){
        try{
            productService.updateProduct(product,pid);
            return ResponseEntity.ok("{\"status\":\"Product updated successfully!!\"}");
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\":\"Failed to update product\"}");
        }
    }

    @DeleteMapping("deleteProduct/{pid}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SELLER')")
    public ResponseEntity<String> deleteProduct(@PathVariable Long pid){
        try{
            productService.deleteByProductId(pid);
            return ResponseEntity.ok("{\"status\":\"Product deleted successfully!!\"}");
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\":\"Failed to delete product\"}");
        }
    }


    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductEntity>> getProductsByCategory(@PathVariable String category) {
        List<ProductEntity> products = productService.getProductsByCategory(category);

        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("/products/{address}")
    public ResponseEntity<List<ProductEntity>> getProductsByAddress(@PathVariable String address){
       try{
           List<ProductEntity> products = productService.searchByAddress(address);

           if(products.isEmpty()){
               return new ResponseEntity<>(HttpStatus.NOT_FOUND);
           }else{
               return new ResponseEntity<>(products,HttpStatus.OK);
           }
       }catch (Exception ex){
           ex.printStackTrace();
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    @GetMapping("/prodName/{pname}")
    public ResponseEntity<List<ProductEntity>> getProductsByName(@PathVariable String pname){
        try{
            List<ProductEntity> productEntities = productService.searchByPname(pname);

            if(productEntities.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }else{
                return new ResponseEntity<>(productEntities,HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/price/{price}")
    public ResponseEntity<List<ProductEntity>> getProductsByPrice(@PathVariable Double price){
        try{
            List<ProductEntity> product = productService.searchByPrice(price);

            if(product.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }else {
                return new ResponseEntity<>(product,HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/prods/{address}/{category}/{price}")
    public ResponseEntity<List<ProductEntity>> getProds(@PathVariable String address, @PathVariable String category,@PathVariable Double price){
        try{
            List<ProductEntity> product = productService.searchByAddressCategoryPrice(address, category, price);

            if(product.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }else {
                return new ResponseEntity<>(product,HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/prods/address-category/{address}/{category}")
    public ResponseEntity<List<ProductEntity>> getProdsByAddressCategory(@PathVariable String address, @PathVariable String category){
        try{
            List<ProductEntity> product = productService.searchByAddressCategory(address, category);

            if(product.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }else {
                return new ResponseEntity<>(product,HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/prods/address-price/{address}/{price}")
    public ResponseEntity<List<ProductEntity>> getProdsByAddressPrice(@PathVariable String address,@PathVariable Double price){
        try{
            List<ProductEntity> product = productService.searchByAddressPrice(address, price);

            if(product.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }else {
                return new ResponseEntity<>(product,HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/prods/category-price/{category}/{price}")
    public ResponseEntity<List<ProductEntity>> getProdsByCategoryPrice(@PathVariable String category,@PathVariable Double price){
        try{
            List<ProductEntity> product = productService.searchByCategoryPrice( category, price);

            if(product.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }else {
                return new ResponseEntity<>(product,HttpStatus.OK);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
