package com.estate.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private Integer sellerId;
}
