import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBirthdayCake, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { TmdbService } from '../../services/tmdbService';
import { useFetch } from '../../hooks/useFetch';
import { Person } from '../../models/Person';
import { Series } from '../../models/Series';
import SeriesCard from '../../components/SeriesCard/SeriesCard';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './PersonDetail.module.scss';

/**
 * Página PersonDetail
 * 
 * Muestra información biográfica de un actor y su filmografía.
 */
const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const personId = Number(id);
  const [bioExpanded, setBioExpanded] = useState(false);

  const { data: person, loading, error } = useFetch<Person>(
    () => TmdbService.getPersonDetail(personId),
    [personId]
  );

  const { data: credits } = useFetch<Series[]>(
    () => TmdbService.getPersonTvCredits(personId),
    [personId]
  );

  if (loading) return <Loading message="Cargando perfil..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!person) return <ErrorMessage message="Persona no encontrada" />;

  const isBioLong = person.biography.length > 500;

  return (
    <div className={styles.person}>
      <button className={styles.person__backBtn} onClick={() => navigate(-1)}>
        <FaArrowLeft />
        <span>Volver</span>
      </button>

      <div className={styles.person__layout}>
        {/* Sidebar: foto + datos */}
        <aside className={styles.person__sidebar}>
          <img
            src={person.profileUrl}
            alt={person.name}
            className={styles.person__photo}
          />

          <div className={styles.person__facts}>
            {person.formattedBirthday && (
              <div className={styles.person__fact}>
                <FaBirthdayCake className={styles.person__factIcon} />
                <div>
                  <span className={styles.person__factLabel}>Nacimiento</span>
                  <span className={styles.person__factValue}>
                    {person.formattedBirthday}
                    {person.age !== null && ` (${person.age} años)`}
                  </span>
                </div>
              </div>
            )}

            {person.placeOfBirth && (
              <div className={styles.person__fact}>
                <FaMapMarkerAlt className={styles.person__factIcon} />
                <div>
                  <span className={styles.person__factLabel}>Lugar de nacimiento</span>
                  <span className={styles.person__factValue}>{person.placeOfBirth}</span>
                </div>
              </div>
            )}

            {person.knownForDepartment && (
              <div className={styles.person__fact}>
                <FaStar className={styles.person__factIcon} />
                <div>
                  <span className={styles.person__factLabel}>Conocido por</span>
                  <span className={styles.person__factValue}>{person.knownForDepartment}</span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main: bio + filmografía */}
        <main className={styles.person__main}>
          <h1 className={styles.person__name}>{person.name}</h1>

          {person.biography && (
            <section className={styles.person__bioSection}>
              <h2 className={styles.person__sectionTitle}>Biografía</h2>
              <p className={styles.person__bio}>
                {bioExpanded ? person.biography : person.shortBio(500)}
              </p>
              {isBioLong && (
                <button
                  className={styles.person__bioToggle}
                  onClick={() => setBioExpanded(!bioExpanded)}
                >
                  {bioExpanded ? 'Ver menos' : 'Leer más'}
                </button>
              )}
            </section>
          )}

          {credits && credits.length > 0 && (
            <section className={styles.person__filmography}>
              <h2 className={styles.person__sectionTitle}>
                Filmografía ({credits.length} series)
              </h2>
              <div className={styles.person__grid}>
                {credits.map(series => (
                  <SeriesCard key={series.id} series={series} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default PersonDetail;