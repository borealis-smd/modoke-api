import * as QuestionRepository from "../models/question";
import * as AttemptRepository from "../models/attempt";
import { AttemptCreate } from "../validators/attemptsValidator";
import { QuizQuestionList } from "../data-structures/QuizQuestionList";

export class QuizSession {
  private questionList: QuizQuestionList;
  private userId: string;
  private lessonId?: number;
  private unitId?: number;
  private isEntranceTest?: boolean;

  constructor(userId: string, lessonId?: number, unitId?: number, isEntranceTest: boolean = false) {
    this.questionList = new QuizQuestionList();
    this.userId = userId;
    this.lessonId = lessonId;
    this.unitId = unitId;
    this.isEntranceTest = isEntranceTest;
  }

  async initialize(): Promise<void> {
    let questions;
    if (this.isEntranceTest) {
      questions = await QuestionRepository.getEntranceTestQuestions();
    } else if (this.lessonId) {
      questions = await QuestionRepository.getQuestionsByLessonId(this.lessonId);
    } else if (this.unitId) {
      questions = await QuestionRepository.getQuestionsByUnitId(this.unitId);
    } else {
      throw new Error("Either lessonId, unitId, or isEntranceTest must be provided");
    }
    
    questions.forEach(question => {
      this.questionList.append(question);
    });
  }

  getCurrentQuestion() {
    return this.questionList.getCurrentQuestion();
  }

  async answerCurrentQuestion(selectedOptionId: string) {
    const currentQuestion = this.questionList.getCurrentQuestion();
    if (!currentQuestion) return null;

    // Store the answer in our list
    this.questionList.answerCurrentQuestion(selectedOptionId);

    // Register the attempt in the database
    const attempt: AttemptCreate = {
      user_id: this.userId,
      question_id: currentQuestion.question_id,
      selected_option_id: selectedOptionId,
    };

    await AttemptRepository.registerAttempt(attempt);

    return currentQuestion;
  }

  getNextQuestion() {
    return this.questionList.getNextQuestion();
  }

  getPreviousQuestion() {
    return this.questionList.getPreviousQuestion();
  }

  hasNextQuestion() {
    return this.questionList.hasNext();
  }

  hasPreviousQuestion() {
    return this.questionList.hasPrevious();
  }

  getProgress() {
    return this.questionList.getProgressSummary();
  }

  isComplete() {
    return this.questionList.areAllQuestionsAnswered();
  }

  // Get all questions with their current answers (useful for review)
  getAllQuestionsWithAnswers() {
    return this.questionList.toArray();
  }

  getCurrentQuestionIndex() {
    return this.questionList.getCurrentIndex();
  }

  getProgressSummary() {
    return this.questionList.getProgressSummary();
  }
} 