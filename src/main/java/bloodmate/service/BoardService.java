package bloodmate.service;

import bloodmate.model.dto.board.BoardDto;
import bloodmate.model.entity.BoardCategoryEntity;
import bloodmate.model.entity.BoardEntity;
import bloodmate.model.repository.BoardCategoryRepository;
import bloodmate.model.repository.BoardRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardCategoryRepository boardCategoryRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    /// 게시물 작성 - C
    public boolean create(String token, BoardDto boardDto) {
        System.out.println(">> BoardService.create start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return false; }
            boardDto.setBoardPostState(1);
            BoardEntity boardEntity = boardDto.toEntity();
            boardEntity.setBoardCategoryEntity(boardCategoryRepository.findByTitle(boardDto.getBoardCategoryTitle()));
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
    public List<BoardDto> findAll() {
        System.out.println(">> BoardService.findAll start");
        try {
            List<BoardEntity> boardEntityList = boardRepository.findAllByBoardStateIsNormal();
            return boardEntityList.stream().map(BoardEntity::toDto).toList();
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BoardService.findAll error!!!");
            return null;
        } finally {
            System.out.println(">> BoardService.findAll end");
        }
    }
    /// 게시물 상세 보기 - R
    public BoardDto findDetail(int boardPostId) {
        System.out.println(">> BoardService.findDetail start");
        try {
            if(boardRepository.existBoardPostStateIsNormal(boardPostId) <= 0) { return null; }
            if(boardRepository.existsById(boardPostId)) { boardRepository.increasePostView(boardPostId); }
            Optional<BoardEntity> optional = boardRepository.findById(boardPostId);
            if(optional.isPresent()) {
                BoardEntity boardEntity = optional.get();
                BoardDto boardDto = boardEntity.toDto();
                System.out.println(">> boardDto = " + boardDto);
                return boardDto;
            }
            return null;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> BoardService.findDetail error!!!");
            return null;
        } finally {
            System.out.println(">> BoardService.findDetail end");
        }
    }
    /// 게시물 수정 - U
    public boolean update(String token, BoardDto boardDto, int boardPostId) {
        System.out.println(">> BoardService.update start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return false; }
            Optional<BoardEntity> optional = boardRepository.findByBoardPostIdToUserId(boardPostId, userId);
            if(optional.isPresent()) {
                BoardEntity boardEntity = optional.get();
                boardEntity.setBoardPostTitle(boardDto.getBoardPostTitle());
                boardEntity.setBoardPostContent(boardDto.getBoardPostContent());
                if(!boardEntity.getBoardCategoryEntity().getBoardCategoryTitle().equals(boardDto.getBoardCategoryTitle())) {
                    BoardCategoryEntity boardCategoryEntity = boardCategoryRepository.findByTitle(boardDto.getBoardCategoryTitle());
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
    public boolean delete(String token, int boardPostId) {
        System.out.println(">> BoardService.delete start");
        int userId = jwtUtil.validateToken(token);
        if(userId <= 0) { return false; }
        Optional<BoardEntity> optional = boardRepository.findByBoardPostIdToUserId(boardPostId, userId);
        if(optional.isPresent()) {
            BoardEntity boardEntity = optional.get();
            boardEntity.setBoardPostState(0);
            return true;
        }
        System.out.println(">> BoardService.delete end");
        return false;
    }
    /// 게시물 작성자 확인 - R

}
