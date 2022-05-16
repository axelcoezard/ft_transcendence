import { ManyToOne, Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity('cv')
export class CvEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50,
	nullable:true
  })
  name: string;

  @Column({
    length: 50,
	nullable:true
  })
  firstname: string;

  @Column({nullable:true})
  age: number;

  @Column({nullable:true})
  cin: number;

  @Column({nullable:true})
  job: string;

  @Column({nullable:true})
  path: string;


}
