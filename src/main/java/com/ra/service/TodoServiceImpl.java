package com.ra.service;
import com.ra.entity.Todo;
import com.ra.reponsitory.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class TodoServiceImpl implements  TodoService{
    @Autowired
    TodoRepository todoRepository;
    @Override
    public List<Todo> findAll() {
        return (List<Todo>)todoRepository.findAll();
    }

    @Override
    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public Todo findById(Long id) {
        Optional<Todo> todoOptional = todoRepository.findById(id);
        return todoOptional.orElse(null);
    }

    @Override
    public void delete(Long id) {
           todoRepository.deleteById(id);
    }
}
