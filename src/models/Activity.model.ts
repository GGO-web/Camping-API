export interface IActivity {
  // activity _id field is predefined by mongoose
  heading: string;
  description: string;
  completed: boolean;
}
