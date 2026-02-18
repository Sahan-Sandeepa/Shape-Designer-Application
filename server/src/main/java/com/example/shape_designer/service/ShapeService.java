package com.example.shape_designer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.shape_designer.entity.Shape;
import com.example.shape_designer.repository.ShapeRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShapeService {

    private final ShapeRepository repository;

    public Shape createShape(Shape shape) {
        shape.setCreatedAt(LocalDateTime.now());
        return repository.save(shape);
    }

    public List<Shape> getAllShapes() {
        return repository.findAll();
    }

    public Shape getShapeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shape not found"));
    }

    public Shape updateShape(Long id, Shape updatedShape) {
        Shape existing = getShapeById(id);
        existing.setName(updatedShape.getName());
        existing.setType(updatedShape.getType());
        existing.setDimensionData(updatedShape.getDimensionData());
        return repository.save(existing);
    }

    public void deleteShape(Long id) {
        repository.deleteById(id);
    }
}
