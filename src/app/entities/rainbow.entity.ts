import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Word} from './word.entity';

@Entity()
export class Rainbow {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    label: string;

    @OneToMany(type => Word, word => word.rainbow)
    words: Word[];

    /**
     [
     {"id": 1, "label": "Lion", "answer": "Lion", "translation": "Lion", "is_correct": true},
     {"id": 1, "label": "Lion", "answer": "Lion", "translation": "Lion", "is_correct": false},
     {"id": 1, "label": "Lion", "answer": "Lion", "translation": "Lion", "is_correct": true},
     {"id": 1, "label": "Lion", "answer": "Lion", "translation": "Lion", "is_correct": true},
     {"id": 1, "label": "Lion", "answer": "Lion", "translation": "Lion", "is_correct": true},
     ]
     * @param answers
     */
    correctAnwers(answers) {
        return this.words.map(word => {

            let answerFinded = answers.filter(answer => answer.id == word.id)[0];
            if (!answerFinded) {
                answerFinded = {answer: null};
            }

            return {
                id: word.id,
                label: word.label,
                answer: answerFinded.answer,
                translation: word.translation,
                is_correct: word.translation == answerFinded.answer
            }
        });
    }
}
