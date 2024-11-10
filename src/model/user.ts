import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Card from "./card";
import Game from "./game";
  
@Entity()
export default class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name?: string;

      // Um usuário pode ter muitos cards
    @OneToMany(() => Card, (card) => card.user)
    cards!: Card[];

    // Um usuário pode ter muitos games
    @OneToMany(() => Game, (game) => game.user)
    games!: Game[];
}