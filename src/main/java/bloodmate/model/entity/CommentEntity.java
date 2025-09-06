package bloodmate.model.entity;

import bloodmate.model.dto.CommentDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "board_comment")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class CommentEntity extends BaseTime {

    /// 댓글 번호 PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_comment_id")
    private int boardCommentId;
    /// 댓글 내용
    @Column(name = "board_comment_content", nullable = false)
    private String boardCommentContent;
    /// 댓글 상태
    @Builder.Default
    @Column(name = "board_comment_state")
    @ColumnDefault("1")
    private int boardCommentState = 1;
    /// 댓글 작성자 FK
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
    /// 게시물 번호 FK
    @ManyToOne
    @JoinColumn(name = "board_post_id")
    private BoardEntity boardEntity;

    /// Entity -> Dto
    public CommentDto toDto() {
        return CommentDto.builder()
                .boardCommentId(this.boardCommentId).boardCommentContent(this.boardCommentContent).boardCommentState(this.boardCommentState)
                .userNickname(this.userEntity.getUserNickname()).boardPostId(this.boardEntity.getBoardPostId())
                .createdAt(getCreatedAt()).updatedAt(getUpdatedAt())
                .build();
    }

}
