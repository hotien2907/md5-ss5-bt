package com.ra.service;



import com.ra.entity.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> findAll();
    Todo save(Todo category);
    Todo findById(Long id);
    void delete(Long id);
}
