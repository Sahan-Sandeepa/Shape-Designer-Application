package com.example.shape_designer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.shape_designer.entity.Shape;
import com.example.shape_designer.service.ShapeService;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
@RequiredArgsConstructor
@CrossOrigin
public class ShapeController {

    private final ShapeService service;

    @PostMapping
    public Shape createShape(@RequestBody Shape shape) {
        return service.createShape(shape);
    }

    @GetMapping
    public List<Shape> getAllShapes() {
        return service.getAllShapes();
    }

    @GetMapping("/{id}")
    public Shape getShapeById(@PathVariable Long id) {
        return service.getShapeById(id);
    }

    @PutMapping("/{id}")
    public Shape updateShape(@PathVariable Long id,
                             @RequestBody Shape shape) {
        return service.updateShape(id, shape);
    }

    @DeleteMapping("/{id}")
    public void deleteShape(@PathVariable Long id) {
        service.deleteShape(id);
    }
}
