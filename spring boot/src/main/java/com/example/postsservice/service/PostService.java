package com.example.postsservice.service;

import com.example.postsservice.model.Post;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class PostService {
    private final List<Post> posts = new ArrayList<>();

    @PostConstruct
    public void init() {
        posts.add(new Post(1L, "First post", "This is the first post."));
        posts.add(new Post(2L, "Second post", "This is the second post."));
        posts.add(new Post(3L, "Third post", "This is the third post."));
    }

    public List<Post> findAll() {
        return Collections.unmodifiableList(posts);
    }
}
