package com.example.shape_designer.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shapes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Shape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @Column(name = "dimension_data", columnDefinition = "json")
    private String dimensionData;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
