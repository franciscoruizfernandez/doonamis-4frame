import { CastMember } from '../../models/CastMember';
import styles from './CastCard.module.scss';

interface CastCardProps {
  member: CastMember;
}

/**
 * Componente CastCard
 * 
 * Tarjeta circular con foto, nombre y personaje de un actor.
 */
const CastCard = ({ member }: CastCardProps) => {
  return (
    <div className={styles.castCard}>
      <div className={styles.castCard__imageWrapper}>
        <img
          src={member.profileUrl}
          alt={member.name}
          className={styles.castCard__image}
          loading="lazy"
        />
      </div>
      <h4 className={styles.castCard__name}>{member.name}</h4>
      <p className={styles.castCard__character}>{member.character}</p>
    </div>
  );
};

export default CastCard;