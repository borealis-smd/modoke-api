import { Question, Option } from "@prisma/client";
import { LinkedList } from "./LinkedList";

export interface QuizQuestion extends Question {
  Options: Option[];
  userAnswer?: string;
}

export class QuizQuestionList extends LinkedList<QuizQuestion> {
  // Get the current question with type safety
  getCurrentQuestion(): QuizQuestion | null {
    return this.getCurrent();
  }

  // Answer the current question
  answerCurrentQuestion(selectedOptionId: string): void {
    const current = this.getCurrentQuestion();
    if (current) {
      current.userAnswer = selectedOptionId;
    }
  }

  // Check if all questions have been answered
  areAllQuestionsAnswered(): boolean {
    return this.toArray().every(question => question.userAnswer !== undefined);
  }

  // Get a summary of answered and unanswered questions
  getProgressSummary(): { answered: number; total: number } {
    const questions = this.toArray();
    const answered = questions.filter(q => q.userAnswer !== undefined).length;

    return {
      answered,
      total: this.size,
    };
  }

  // Get the next question with type safety
  getNextQuestion(): QuizQuestion | null {
    return this.next();
  }

  // Get the previous question with type safety
  getPreviousQuestion(): QuizQuestion | null {
    return this.previous();
  }
} 