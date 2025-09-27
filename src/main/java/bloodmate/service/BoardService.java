package bloodmate.service;

import bloodmate.model.dto.CommentDto;
import bloodmate.model.dto.board.BoardRequestDto;
import bloodmate.model.dto.board.BoardResponseDto;
import bloodmate.model.entity.BoardCategoryEntity;
import bloodmate.model.entity.BoardEntity;
import bloodmate.model.entity.CommentEntity;
import bloodmate.model.repository.BoardCategoryRepository;
import bloodmate.model.repository.BoardRepository;
import bloodmate.model.repository.CommentRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardCategoryRepository boardCategoryRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    /// 게시물 작성 - C
    public boolean create(String token, BoardRequestDto boardRequestDto) {
        System.out.println(">> BoardService.create start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return false; }
            boardRequestDto.setBoardPostState(1);
            BoardEntity boardEntity = boardRequestDto.toEntity();
            boardEntity.setBoardCategoryEntity(boardCategoryRepository.findByTitle(boardRequestDto.getBoardCategoryTitle()));
            boardEntity.setUserEntity(userRepository.findById(userId).orElse(null));
            boardEntity = boardRepository.save(boardEntity);
            if(boardEntity.getBoardPostId() <= 0) { return false; }
            System.out.println(">> boardEntity = " + boardEntity);
            return true;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BoardService.create error!!!");
            return false;
        } finally {
            System.out.println(">> BoardService.create end");
        }
    }

    /// 게시물 전체 출력 - R --> 추후 페이징 적용 예정
    public ResponseEntity<List<BoardResponseDto>> findAll() {
        System.out.println(">> BoardService.findAll start");
        try {
            List<BoardEntity> boardEntityList = boardRepository.findAllByBoardStateIsNormal();
            List<BoardResponseDto> result = boardEntityList.stream().map(BoardEntity::toDto).toList();
            return ResponseEntity.status(200).body(result);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BoardService.findAll error!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> BoardService.findAll end");
        }
    }

    /// 게시물 카테고리별 전체 출력 - R
    public ResponseEntity<List<BoardResponseDto>> findAllCategory(String boardCategoryTitle) {
        System.out.println(">> BoardService.findAllCategory start");
        try {
            BoardCategoryEntity boardCategoryEntity = boardCategoryRepository.findByTitle(boardCategoryTitle);
            if(boardCategoryEntity == null) { return null; }
            List<BoardEntity> boardEntityList = boardRepository.findAllCategory(boardCategoryEntity.getBoardCategoryId());
            List<BoardResponseDto> result = boardEntityList.stream().map(BoardEntity::toDto).toList();
            return ResponseEntity.status(200).body(result);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BoardService.findAllCategory error!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> BoardService.findAllCategory end");
        }
    }

    /// 게시물 상세 보기 - R
    public ResponseEntity<BoardResponseDto> findDetail(int boardPostId) {
        System.out.println(">> BoardService.findDetail start");
        try {
            if(boardRepository.existBoardPostStateIsNormal(boardPostId) <= 0) { return null; }
            if(boardRepository.existsById(boardPostId)) { boardRepository.increasePostView(boardPostId); }
            Optional<BoardEntity> optional = boardRepository.findById(boardPostId);
            if(optional.isPresent()) {
                BoardEntity boardEntity = optional.get();
                BoardResponseDto boardResponseDto = boardEntity.toDto();
                List<CommentEntity> commentEntityList = commentRepository.findByBoardPostIdASC(boardPostId);
                List<CommentDto> commentDtoList = commentEntityList.stream().map(CommentEntity::toDto).toList();
                boardResponseDto.setCommentDtoList(commentDtoList);
                System.out.println(">> boardDto = " + boardResponseDto);
                return ResponseEntity.status(200).body(boardResponseDto);
            }
            return ResponseEntity.status(400).body(null);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BoardService.findDetail error!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> BoardService.findDetail end");
        }
    }

    /// 게시물 수정 - U
    public boolean update(String token, BoardRequestDto boardRequestDto, int boardPostId) {
        System.out.println(">> BoardService.update start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return false; }
            Optional<BoardEntity> optional = boardRepository.findByBoardPostIdToUserId(boardPostId, userId);
            if(optional.isPresent()) {
                BoardEntity boardEntity = optional.get();
                boardEntity.setBoardPostTitle(boardRequestDto.getBoardPostTitle());
                boardEntity.setBoardPostContent(boardRequestDto.getBoardPostContent());
                if(!boardEntity.getBoardCategoryEntity().getBoardCategoryTitle().equals(boardRequestDto.getBoardCategoryTitle())) {
                    BoardCategoryEntity boardCategoryEntity = boardCategoryRepository.findByTitle(boardRequestDto.getBoardCategoryTitle());
                    boardEntity.setBoardCategoryEntity(boardCategoryEntity);
                }
                System.out.println(">> boardEntity = " + boardEntity);
                return true;
            }
            return false;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BoardService.update error!!!");
            return false;
        } finally {
            System.out.println(">> BoardService.update end");
        }

    }

    /// 게시물 삭제 - D
    public ResponseEntity<Boolean> delete(String token, int boardPostId) {
        System.out.println(">> BoardService.delete start");
        int userId = jwtUtil.validateToken(token);
        if(userId <= 0) { return ResponseEntity.status(400).body(false); }
        Optional<BoardEntity> optional = boardRepository.findByBoardPostIdToUserId(boardPostId, userId);
        if(optional.isPresent()) {
            BoardEntity boardEntity = optional.get();
            boardEntity.setBoardPostState(0);
            return ResponseEntity.status(200).body(true);
        }
        System.out.println(">> BoardService.delete end");
        return ResponseEntity.status(400).body(false);
    }

    /// 게시물 작성자 확인 - R
    public ResponseEntity<Boolean> findWriter(String token, int boardPostId) {
        System.out.println(">> BoardService.findWriter start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(false); }
            Optional<BoardEntity> optional = boardRepository.findById(boardPostId);
            if(optional.isPresent()) {
                BoardEntity boardEntity = optional.get();
                if(userId == boardEntity.getUserEntity().getUserId()) {
                    return ResponseEntity.status(200).body(true);
                }
            }
            return ResponseEntity.status(400).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BoardService.findWriter error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> BoardService.findWriter end");
        }
    }

}
