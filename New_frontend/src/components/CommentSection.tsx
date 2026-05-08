// src/components/CommentSection.tsx

import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

interface Comment {
  name: string;
  message: string;
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !message) return;

    setComments([...comments, { name, message }]);
    setName("");
    setMessage("");
  };

  return (
    <div className="mt-5">
      <h4>Leave a Comment</h4>

      <Form>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Your Comment"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant="dark" className="btn btn-dark" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>

      {/* Comments List */}
      <div className="mt-4">
        {comments.map((c, index) => (
          <Card key={index} className="mb-2 p-2">
            <strong>{c.name}</strong>
            <p className="mb-0">{c.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;