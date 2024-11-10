import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne
  } from "typeorm";
  import Game from "./game";
import User from "./user";
  
  @Entity()
  export default class Card extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    value?: string;

    @Column()
    quantity?: number;
  
    @Column()
    color?: string;
  
    @ManyToMany(() => Game, (game) => game.cards)
    games!: Game[];

     // Muitos cards podem pertencer a um usuário
    @ManyToOne(() => User, (user) => user.cards)
    user!: User;
  }
  