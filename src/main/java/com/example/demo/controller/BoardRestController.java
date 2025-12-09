package com.example.demo.controller;

import com.example.demo.entity.Board;
import com.example.demo.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BoardRestController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/api/board/list")
    public List<Board> boardListApi(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return boardService.boardList(page, size);
    }

    @GetMapping("/api/board/list/no-cache")
    public List<Board> boardListNoCacheApi(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return boardService.boardListNoCache(page, size);
    }
}