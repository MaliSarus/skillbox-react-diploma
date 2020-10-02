import React from "react";

const Title = (props) => (
    <div>
        <a href={props.postCreatorLink}>{props.postCreator}</a>
    </div>
);

export default Title;