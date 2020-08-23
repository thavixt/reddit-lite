import React from 'react';
import unescape from 'unescape';
import { upvoteComment, downvoteComment } from '../../api';
import Awards from '../Awards';
import ShowMore from '../CommentTree/ShowMore';
import Timestamp from '../Timestamp';
import Votes from '../Votes';

export default function CommentBranch(props: Reddit.Comment) {
    const { data } = props;
    const [isOpen, setOpen] = React.useState(true);

    if (data.count) {
        return <ShowMore data={data} />
    }

    const replies = data.replies && data.replies.data.children ?
        data.replies.data.children.map(el => <CommentBranch key={el.data.id} data={el.data} />)
        : null;

    const upvote = () => upvoteComment(data.id);
    const downvote = () => downvoteComment(data.id);

    return (
        <div className={`Comment ${isOpen ? '' : 'hidden'}`}>
            <div className="side">
                {isOpen && <Votes
                    arrows
                    upvote={upvote}
                    downvote={downvote}
                // upvoted={data.upvoted}
                // downvoted={data.downvoted}
                />}
                <div className="toggle" onClick={() => setOpen(!isOpen)}>
                    {isOpen ? <hr /> : '+'}
                </div>
            </div>
            <div className="content">
                <div className={`body ${data.stickied ? 'stickied' : ''}`}>
                    <div className="header">
                        <span className={`author${data.is_submitter ? ' op' : ''}`}>
                            {data.author}
                        </span>
                        {data.score_hidden ?
                            'score hidden'
                            : (<Votes className="score" score={data.score}> points</Votes>)
                        } -&nbsp;
                        <Timestamp className="date" timestamp={data.created_utc} />&nbsp;
                        <Awards className="awards" awards={data.all_awardings || []} />
                        {data.stickied && <span>
                            - <span className="stickied">sticked comment</span>
                        </span>}
                    </div>
                    {isOpen && <div
                        className="text"
                        dangerouslySetInnerHTML={{ __html: unescape(data.body_html) }}
                    />}
                </div>
                {isOpen && replies}
            </div>
        </div >
    );
}
