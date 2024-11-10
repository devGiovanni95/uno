import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne
  } from "typeorm";
  import Card from "./card";
import User from "./user";
  
  @Entity()
  export default class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    cod_game?: string;
  
    @ManyToMany(() => Card, (card) => card.games)
    cards!: Card[];

    // Muitos games podem pertencer a um usuário
    @ManyToOne(() => User, (user) => user.games)
    user!: User;
  }
  