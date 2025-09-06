package bloodmate.model.dto;

import bloodmate.model.entity.CommentEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class CommentDto {

    /// 댓글 번호 PK
    private int boardCommentId;
    /// 댓글 내용
    private String boardCommentContent;
    /// 댓글 상태
    private int boardCommentState;
    /// 댓글 작성자 FK
    private String userNickname;
    /// 게시물 번호 FK
    private int boardPostId;
    /// 작성일
    private LocalDateTime createdAt;
    /// 수정일
    private LocalDateTime updatedAt;

    /// Dto -> Entity
    public CommentEntity toEntity() {
        return CommentEntity.builder()
                .boardCommentId(this.boardCommentId).boardCommentContent(this.boardCommentContent)
                .build();
    }

}
