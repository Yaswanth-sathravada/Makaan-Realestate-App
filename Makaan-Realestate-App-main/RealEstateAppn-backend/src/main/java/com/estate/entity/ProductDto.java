package com.estate.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long pid;
    private String pname;
    private Double price;
    private String imageLink;
    private String category;
    private String address;
    private String facing;
    private String furnished;
    private String status;
    private Integer bedrooms;
    private Integer bathrooms;
    private Long size;
    private String type;
}
