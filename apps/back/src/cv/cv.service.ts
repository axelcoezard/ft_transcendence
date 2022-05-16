import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';

@Injectable()
export class CvService {
  constructor(
	@InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,

) {}

  async getCvs(): Promise<CvEntity[]> {
      return await this.cvRepository.find();
  }

  async addCv(cv: AddCvDto): Promise<CvEntity> {
    const newCv = this.cvRepository.create(cv);
    await this.cvRepository.save(newCv);
    // await this.mailService.addedCvMail();
    /*this.eventEmitter.emit(EVENTS.CV_ADD, {
      name: newCv.name
    });*/
    return newCv;
  }

  //async updateCv(id: number, cv: UpdateCvDto/*, user*/): //Promise<CvEntity> {
    //On récupére le cv d'id id et ensuite on remplace les anciennes valeurs de ce cv
    // par ceux du cv passé en paramètre
   /* const newCv = await this.cvRepository.preload({
      id,
      ...cv
    });
    // tester le cas ou le cv d'id id n'existe pas
    if(! newCv) {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    }
    //sauvgarder la nouvelle entité donc le nouveau cv
   if (this.userService.isOwnerOrAdmin(newCv, user))
      return await this.cvRepository.save(newCv);
    else
      new UnauthorizedException('');
  }*/

 /* updateCv2(updateCriteria, cv: UpdateCvDto ) {
    return this.cvRepository.update(updateCriteria, cv);
  }*/


}