package bloodmate.controller;

import bloodmate.model.dto.board.BoardDto;
import bloodmate.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    /// 게시물 작성 - C
    @PostMapping("")
    public boolean create(@RequestHeader("Authorization") String token, @RequestBody BoardDto boardDto) {
        System.out.println(">> BoardController.create start");
        System.out.println(">> token = " + token);
        System.out.println(">> boardDto = " + boardDto);
        boolean result = boardService.create(token, boardDto);
        System.out.println(">> BoardController.create end\n");
        return result;
    }
    /// 게시물 전체 출력 - R --> 추후 페이징 적용 예정
    @GetMapping("")
    public List<BoardDto> findAll() {
        System.out.println(">> BoardController.findAll start");
        List<BoardDto> result = boardService.findAll();
        System.out.println(">> BoardController.findAll end\n");
        return result;
    }
    /// 게시물 상세 보기 - R
    @GetMapping("{boardPostId}")
    public BoardDto findDetail(@PathVariable("boardPostId") int boardPostId) {
        System.out.println(">> BoardController.findDetail start");
        System.out.println(">> boardPostId = " + boardPostId);
        BoardDto result = boardService.findDetail(boardPostId);
        System.out.println(">> BoardController.findDetail end\n");
        return result;
    }
    /// 게시물 수정 - U
    @PutMapping("/{boardPostId}")
    public boolean update(@RequestHeader("Authorization") String token, @RequestBody BoardDto boardDto, @PathVariable("boardPostId") int boardPostId) {
        System.out.println(">> BoardController.update start");
        System.out.println(">> token = " + token);
        System.out.println(">> boardDto = " + boardDto);
        System.out.println(">> boardPostId = " + boardPostId);
        boolean result = boardService.update(token, boardDto, boardPostId);
        System.out.println(">> BoardController.update end\n");
        return result;
    }
    /// 게시물 삭제 - D
    @DeleteMapping("/{boardPostId}")
    public boolean delete(@RequestHeader("Authorization") String token, @PathVariable("boardPostId") int boardPostId) {
        System.out.println(">> BoardController.delete start");
        System.out.println(">> token = " + token);
        System.out.println(">> boardPostId = " + boardPostId);
        boolean result = boardService.delete(token, boardPostId);
        System.out.println(">> BoardController.delete end\n");
        return result;
    }
    /// 게시물 작성자 확인 - R

}
