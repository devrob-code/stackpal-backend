import { GiftCard } from 'src/repositories/gift-cards/entities/gift-card.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('giftCardReceipts')
export class GiftCardReceipts {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  giftCardId: number;

  @Column('varchar')
  giftCardName: string;

  @Column('varchar')
  name: string;

  @Column('int')
  rate: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => GiftCard, (giftCard) => giftCard.giftCardReceipts)
  giftCard: GiftCard[];
}
