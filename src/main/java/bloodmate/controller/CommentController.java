package bloodmate.controller;

import bloodmate.model.dto.CommentDto;
import bloodmate.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board/comment")
public class CommentController {

    private final CommentService commentService;

    /// 댓글 작성 - C
    @PostMapping("/{boardPostId}")
    public boolean create(@RequestHeader("Authorization") String token, @RequestBody CommentDto commentDto, @PathVariable("boardPostId") int boardPostId) {
        System.out.println(">> CommentController.create start");
        System.out.println(">> token = " + token);
        System.out.println(">> commentDto = " + commentDto);
        System.out.println(">> boardPostId = " + boardPostId);
        boolean result = commentService.create(token, commentDto, boardPostId);
        System.out.println(">> CommentController.create end\n");
        return result;
    }

    /// 댓글 수정 - U
    @PutMapping("/{boardPostId}/{boardCommentId")
    public boolean update(
            @RequestHeader("Authorization") String token,
            @RequestBody CommentDto commentDto,
            @PathVariable("boardPostId") int boardPostId, @PathVariable("boardCommentId") int boardCommentId)
    {
        System.out.println("CommentController.update");
        System.out.println("token = " + token);
        System.out.println("commentDto = " + commentDto);
        System.out.println("boardPostId = " + boardPostId);
        System.out.println("boardCommentId = " + boardCommentId);
        boolean result = commentService.update(token, commentDto, boardPostId, boardCommentId);
        System.out.println("CommentController.update");
        return result;
    }

    /// 댓글 삭제 - D

}
