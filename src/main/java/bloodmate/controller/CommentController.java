package bloodmate.controller;

import bloodmate.model.dto.CommentDto;
import bloodmate.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board/comment")
public class CommentController {

    private final CommentService commentService;

    /// 댓글 작성 - C
    @PostMapping("/{boardPostId}")
    public ResponseEntity<Boolean> create(@RequestHeader("Authorization") String token, @RequestBody CommentDto commentDto, @PathVariable("boardPostId") int boardPostId) {
        System.out.println(">> CommentController.create start");
        System.out.println(">> token = " + token);
        System.out.println(">> commentDto = " + commentDto);
        System.out.println(">> boardPostId = " + boardPostId);
        ResponseEntity<Boolean> result = commentService.create(token, commentDto, boardPostId);
        System.out.println(">> CommentController.create end\n");
        return result;
    }

    /// 댓글 출력 - R
    @GetMapping("/{boardPostId}")
    public ResponseEntity<List<CommentDto>> findComment(@PathVariable("boardPostId") int boardPostId, @RequestParam("sort") String sort) {
        System.out.println(">> CommentController.delete start");
        System.out.println(">> boardPostId = " + boardPostId);
        System.out.println(">> sort = " + sort);
        ResponseEntity<List<CommentDto>> result = commentService.findComment(boardPostId, sort);
        System.out.println(">> CommentController.delete end\n");
        return result;
    }


    /// 댓글 수정 - U
    @PutMapping("/{boardCommentId}")
    public ResponseEntity<Boolean> update(
            @RequestHeader("Authorization") String token,
            @RequestBody CommentDto commentDto,
            @PathVariable("boardCommentId") int boardCommentId)
    {
        System.out.println(">> CommentController.update start");
        System.out.println(">> token = " + token);
        System.out.println(">> commentDto = " + commentDto);
        System.out.println(">> boardCommentId = " + boardCommentId);
        ResponseEntity<Boolean> result = commentService.update(token, commentDto, boardCommentId);
        System.out.println(">> CommentController.update end\n");
        return result;
    }

    /// 댓글 삭제 - D
    @DeleteMapping("/{boardCommentId}")
    public ResponseEntity<Boolean> delete(@RequestHeader("Authorization") String token, @PathVariable("boardCommentId") int boardCommentId) {
        System.out.println(">> CommentController.delete start");
        System.out.println(">> token = " + token);
        System.out.println(">> boardCommentId = " + boardCommentId);
        ResponseEntity<Boolean> result = commentService.delete(token, boardCommentId);
        System.out.println(">> CommentController.delete end\n");
        return result;
    }

    /// 댓글 작성자 확인 - R
    @GetMapping("/check-writer/{boardCommentId}")
    public ResponseEntity<Boolean> findWriter(@RequestHeader("Authorization") String token, @PathVariable("boardCommentId") int boardCommentId) {
        System.out.println(">> CommentController.findWriter start");
        System.out.println(">> token = " + token);
        System.out.println(">> boardCommentId = " + boardCommentId);
        ResponseEntity<Boolean> result = commentService.findWriter(token, boardCommentId);
        System.out.println(">> CommentController.findWriter end\n");
        return result;
    }

}
