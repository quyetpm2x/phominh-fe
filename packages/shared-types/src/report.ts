export type ReportStatus = 'pending' | 'reviewing' | 'resolved' | 'dismissed';

export interface Report {
  id: string;
  postId: string;
  reporterId: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}
