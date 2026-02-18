package com.example.shape_designer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.shape_designer.entity.Shape;

public interface ShapeRepository extends JpaRepository<Shape, Long> {
}
