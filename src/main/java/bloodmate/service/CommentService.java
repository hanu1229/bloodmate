package bloodmate.service;

import bloodmate.model.dto.CommentDto;
import bloodmate.model.entity.BoardEntity;
import bloodmate.model.entity.CommentEntity;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.repository.BoardRepository;
import bloodmate.model.repository.CommentRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    /// 댓글 작성 - C
    public ResponseEntity<Boolean> create(String token, CommentDto commentDto, int boardPostId) {
        System.out.println(">> CommentService.create start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(false); }
            commentDto.setBoardCommentState(1);
            CommentEntity commentEntity = commentDto.toEntity();
            commentEntity.setUserEntity(userRepository.findById(userId).orElse(null));
            commentEntity.setBoardEntity(boardRepository.findById(boardPostId).orElse(null));
            commentEntity = commentRepository.save(commentEntity);
            if(commentEntity.getBoardCommentId() <= 0) { return ResponseEntity.status(400).body(false); }
            System.out.println(">> commentEntity = " + commentEntity);
            return ResponseEntity.status(201).body(true);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> CommentService.create error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> CommentService.create end");
        }
    }

    /// 댓글 출력 - R
    public ResponseEntity<List<CommentDto>> findComment(int boardPostId, String sort) {
        System.out.println(">> CommentService.findComment start");
        try {
            List<CommentEntity> entityList;
            if(sort.equals("DESC")) {
                entityList = commentRepository.findByBoardPostIdDESC(boardPostId);
            } else {
                entityList = commentRepository.findByBoardPostIdASC(boardPostId);
            }
            List<CommentDto> dtoList = entityList.stream().map(CommentEntity::toDto).toList();
            return ResponseEntity.status(200).body(dtoList);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> CommentService.findComment error!!!");
            return ResponseEntity.status(400).body(null);
        } finally {
            System.out.println(">> CommentService.findComment end");
        }
    }

    /// 댓글 수정 - U
    public ResponseEntity<Boolean> update(String token, CommentDto commentDto, int boardCommentId) {
        System.out.println(">> CommentService.update start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(false); }
            Optional<CommentEntity> optional = commentRepository.updateByComment(userId, boardCommentId);
            if(optional.isPresent()) {
                CommentEntity commentEntity = optional.get();
                commentEntity.setBoardCommentContent(commentDto.getBoardCommentContent());
                System.out.println(">> commentEntity = " + commentEntity);
                return ResponseEntity.status(200).body(true);
            }
            return ResponseEntity.status(400).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> CommentService.update error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> CommentService.update end");
        }
    }

    /// 댓글 삭제 - D
    public ResponseEntity<Boolean> delete(String token, int boardCommentId) {
        System.out.println(">> CommentService.delete start");
        int userId = jwtUtil.validateToken(token);
        if(userId <= 0) { return ResponseEntity.status(400).body(false); }
        Optional<CommentEntity> optional = commentRepository.deleteByComment(userId, boardCommentId);
        if(optional.isPresent()) {
            CommentEntity commentEntity = optional.get();
            commentEntity.setBoardCommentState(0);
            System.out.println("하이요??");
            return ResponseEntity.status(200).body(true);
        }
        System.out.println(">> CommentService.delete end");
        return ResponseEntity.status(400).body(false);
    }

    /// 댓글 작성자 확인 - R
    public ResponseEntity<Boolean> findWriter(String token, int boardCommentId) {
        System.out.println(">> CommentService.findWriter start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return ResponseEntity.status(400).body(false); }
            Optional<CommentEntity> commentOptional = commentRepository.findById(boardCommentId);
            if(commentOptional.isPresent()) {
                CommentEntity commentEntity = commentOptional.get();
                if(userId == commentEntity.getUserEntity().getUserId()) {
                    return ResponseEntity.status(200).body(true);
                }
            }
            return ResponseEntity.status(400).body(false);
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> CommentService.findWriter error!!!");
            return ResponseEntity.status(400).body(false);
        } finally {
            System.out.println(">> CommentService.findWriter end");
        }
    }
}
