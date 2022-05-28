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
            RS School is free-of-charge and community-based education program conducted by The
            Rolling Scopes developer community since 2013. Everyone can study at RS School,
            regardless of age, professional employment, or place of residence. The mentors and
            trainers of our school are front-end and javascript developers from different companies
            and countries.
          </div>
        </div>
        <div className={styles.content_section}>
          <div className={styles.content_section__title}>{t('welcomePage.titles.project')}</div>
          <div className={styles.content_section__description}>
            Система управления проектами – приложение помогающее достичь поставленные задачи
            отдельному человеку в команде или группе разработчиков.
          </div>
        </div>
        <div className={styles.content_section}>
          <div className={styles.content_section__title}>{t('welcomePage.titles.team')}</div>
          <div className={styles.content_section__description}>Все сделал Андрей.</div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default WelcomePage;
