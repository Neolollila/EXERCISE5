package com.example.demo.Repository;

import com.example.demo.Model.Paint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaintRepository extends JpaRepository<Paint, Long> {
    @Query("SELECT u FROM Paint u WHERE u.id = ?1")
    public Paint findById(long id);

}
