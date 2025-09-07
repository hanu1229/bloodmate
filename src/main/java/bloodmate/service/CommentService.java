package bloodmate.service;

import bloodmate.model.dto.CommentDto;
import bloodmate.model.entity.CommentEntity;
import bloodmate.model.entity.UserEntity;
import bloodmate.model.repository.BoardRepository;
import bloodmate.model.repository.CommentRepository;
import bloodmate.model.repository.UserRepository;
import bloodmate.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public boolean create(String token, CommentDto commentDto, int boardPostId) {
        System.out.println(">> CommentService.create start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return false; }
            commentDto.setBoardCommentState(1);
            CommentEntity commentEntity = commentDto.toEntity();
            commentEntity.setUserEntity(userRepository.findById(userId).orElse(null));
            commentEntity.setBoardEntity(boardRepository.findById(boardPostId).orElse(null));
            commentEntity = commentRepository.save(commentEntity);
            if(commentEntity.getBoardCommentId() <= 0) { return false; }
            System.out.println(">> commentEntity = " + commentEntity);
            return true;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> CommentService.create error!!!");
            return false;
        } finally {
            System.out.println(">> CommentService.create end");
        }
    }

    /// 댓글 수정 - U
    public boolean update(String token, CommentDto commentDto, int boardPostId, int boardCommentId) {
        System.out.println(">> CommentService.update start");
        try {
            int userId = jwtUtil.validateToken(token);
            if(userId <= 0) { return false; }
            Optional<CommentEntity> optional = commentRepository.updateByComment(userId, boardPostId, boardCommentId);
            if(optional.isPresent()) {
                CommentEntity commentEntity = optional.get();
                commentEntity.setBoardCommentContent(commentDto.getBoardCommentContent());
                System.out.println(">> commentEntity = " + commentEntity);
                return true;
            }
            return false;
        } catch(Exception e) {
            System.out.println(">> " + e);
            System.out.println(">> CommentService.update error!!!");
            return false;
        } finally {
            System.out.println(">> CommentService.update end");
        }
    }

    /// 댓글 삭제 - D
    public boolean delete(String token, int boardCommentId) {
        System.out.println(">> CommentService.delete start");
        int userId = jwtUtil.validateToken(token);
        if(userId <= 0) { return false; }
        Optional<CommentEntity> optional = commentRepository.deleteByComment(userId, boardCommentId);
        if(optional.isPresent()) {
            CommentEntity commentEntity = optional.get();
            commentEntity.setBoardCommentState(0);
            return true;
        }
        System.out.println(">> CommentService.delete end");
        return false;
    }

}
