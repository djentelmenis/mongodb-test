export interface Item {
  tags?: (string)[] | null;
  owner: User;
  comment_count: number;
  delete_vote_count: number;
  close_vote_count: number;
  is_answered: boolean;
  view_count: number;
  favorite_count: number;
  down_vote_count: number;
  up_vote_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  share_link: string;
  body_markdown: string;
  link: string;
  title: string;
  answers?: (Answer)[] | null;
  comments?: (Comment)[] | null;
  accepted_answer_id?: number | null;
  last_editor?: User | null;
  last_edit_date?: number | null;
  closed_date?: number | null;
  closed_reason?: string | null;
}

export interface User {
  reputation: number;
  user_id: number;
  user_type: string;
  profile_image: string;
  display_name: string;
  link: string;
  accept_rate?: number | null;
}

export interface Answer {
  tags?: (null)[] | null;
  owner: User;
  comment_count: number;
  down_vote_count: number;
  up_vote_count: number;
  is_accepted: boolean;
  score: number;
  last_activity_date: number;
  creation_date: number;
  answer_id: number;
  question_id: number;
  share_link: string;
  body_markdown: string;
  link: string;
  title: string;
  comments?: (Comment)[] | null;
  last_editor?: User | null;
  last_edit_date?: number | null;
}

export interface Comment {
  owner: User;
  edited: boolean;
  score: number;
  creation_date: number;
  post_id: number;
  comment_id: number;
  link: string;
  reply_to_user?: User | null;
}
