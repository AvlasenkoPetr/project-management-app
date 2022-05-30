import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/Footer/Footer';
import Header from './Header/Header';
import styles from './WelcomePage.module.scss';

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content_container}>
        <div className={styles.content_section}>
          <div className={styles.content_section__title}>{t('welcomePage.titles.course')}</div>
          <div className={styles.content_section__description}>
            {t('welcomePage.description.course')}
          </div>
        </div>
        <div className={styles.content_section}>
          <div className={styles.content_section__title}>{t('welcomePage.titles.project')}</div>
          <div className={styles.content_section__description}>
            {t('welcomePage.description.project')}
          </div>
        </div>
        <div className={styles.content_section}>
          <div className={styles.content_section__title}>{t('welcomePage.titles.team')}</div>
          <div className={styles.content_section__description}>
            <div className={styles.content_section__team_container}>
              <img src={require('../../assets/img/img.jpg')} alt="petr" />
              <div className={styles.content_section__team_container__content}>
                <h2>{t('welcomePage.names.petr')}</h2>
                <p>{t('welcomePage.done.petr')}</p>
              </div>
            </div>
            <div className={styles.content_section__team_container}>
              <img src={require('../../assets/img/andrey.jpg')} alt="andrey" />
              <div className={styles.content_section__team_container__content}>
                <h2>{t('welcomePage.names.andrey')}</h2>
                <p>{t('welcomePage.done.andrey')}</p>
              </div>
            </div>
            <div className={styles.content_section__team_container}>
              <img src={require('../../assets/img/vlad.jpg')} alt="vlad" />
              <div className={styles.content_section__team_container__content}>
                <h2>{t('welcomePage.names.vlad')}</h2>
                <p>{t('welcomePage.done.vlad')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default WelcomePage;
