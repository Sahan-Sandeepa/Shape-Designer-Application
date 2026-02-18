package com.example.shape_designer.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.shape_designer.entity.Shape;
import com.example.shape_designer.repository.ShapeRepository;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ShapeRepository repository;

    @Override
    public void run(String... args) {

        if (repository.count() == 0) {

            repository.save(new Shape(
                    null,
                    "Default Rectangle",
                    "RECTANGLE",
                    "{\"width\":100,\"height\":100}",
                    LocalDateTime.now()
            ));

            repository.save(new Shape(
                    null,
                    "Default Circle",
                    "CIRCLE",
                    "{\"radius\":50}",
                    LocalDateTime.now()
            ));

            repository.save(new Shape(
                    null,
                    "Default Triangle",
                    "TRIANGLE",
                    "{\"base\":100,\"height\":80}",
                    LocalDateTime.now()
            ));
        }
    }
}
