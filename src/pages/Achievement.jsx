import React from 'react';
import { useLifeHub, usePageStyles } from '../utils/hooks.js';
import { Nav, Avatar, Link, StatCard, FloatCard } from '../components/index.js';
import { getShopItems, buyShopItem, equipItem, unlockableBadges, labelFromId } from '../utils/core.js';

export default function Achievement() {
  usePageStyles(['/css/pages.css', '/css/achievement.css', '/css/gamification.css']);

  const { gamification, character, profile } = useLifeHub();
  const shop = getShopItems();
  const badges = unlockableBadges();

  const xpBase = (gamification.level - 1) * 150;
  const xpNow = gamification.xp - xpBase;
  const pct = Math.min(100, (xpNow / 150) * 100);

  return (
    <>
      <Nav active="achievement" />
      <main className="page-shell">
        <section className="feature-hero">
          <div>
            <p className="eyebrow">Achievement & Shop</p>
            <h1>Turn progress into rewards.</h1>
            <p>Track your level, XP, streak, eco points, and coins. Spend earned coins to unlock character skins, outfits, and equipment.</p>
            <div className="hero-actions">
              <a href="#shopSection" className="primary-btn">
                Open Shop
              </a>
              <Link to="/quest" className="secondary-btn">
                Earn More Coins
              </Link>
            </div>
          </div>

          {/* <div className="visual-stage achievement-visual-stage">
            <div className="visual-orb"></div>

            <FloatCard variant="one">
              <div className="character-preview-card">
                <Avatar size="medium" character={character} />
                <h4>{profile.name}</h4>
                <p>
                  {labelFromId(character.outfit)} • {labelFromId(character.equipment)}
                </p>
              </div>
            </FloatCard>

            <FloatCard variant="two">
              <div className="progress-ring">
                <span>{gamification.level}</span>
              </div>
              <h4>Current Level</h4>
              <p>{xpNow} / 150 XP</p>
            </FloatCard>

            <FloatCard variant="three">
              <h4>{gamification.coins} Coins</h4>
              <p>Use coins to unlock shop items.</p>
            </FloatCard>
          </div> */}
        </section>

        <section className="stats-grid achievement-stats">
          <StatCard label="Level" value={gamification.level} />
          <StatCard label="Total XP" value={gamification.xp} />
          <StatCard label="Coins" value={gamification.coins} />
          <StatCard label="Eco Points" value={gamification.ecoPoints} />
        </section>

        <section className="feature-workspace achievement-workspace">
          <section className="feature-panel">
            <p className="panel-label">Badges</p>
            <h2>Your Achievements</h2>

            <div className="badge-list">
              {badges.map((b) => (
                <div className={`badge-card ${b.unlocked ? 'unlocked' : 'locked'}`} key={b.id}>
                  <span>{b.icon}</span>
                  <p>{b.id}</p>
                </div>
              ))}
            </div>

            <div className="xp-progress">
              <div className="xp-info">
                <span>XP Progress</span>
                <span>{xpNow} / 150 XP</span>
              </div>
              <div className="xp-bar">
                <div style={{ width: `${pct}%` }}></div>
              </div>
            </div>
          </section>

          <section className="feature-panel" id="shopSection">
            <p className="panel-label">Shop</p>
            <h2>Character Store</h2>

            <div className="shop-list">
              {shop.map((item) => (
                <div className="shop-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="tag light">{item.type}</span>
                  </div>

                  <div className="shop-action">
                    <strong>{item.price} 🪙</strong>
                    {item.owned ? (
                      <button className="secondary-btn" onClick={() => equipItem(item.id)}>
                        Equip
                      </button>
                    ) : (
                      <button className="primary-btn" onClick={() => buyShopItem(item.id)}>
                        Buy
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="feature-panel inventory-panel">
            <p className="panel-label">Inventory</p>
            <h2>Equipped Items</h2>

            <div className="inventory-list">
              <div className="inventory-item">
                <span>Skin</span>
                <h3>{labelFromId(character.skin)}</h3>
              </div>
              <div className="inventory-item">
                <span>Outfit</span>
                <h3>{labelFromId(character.outfit)}</h3>
              </div>
              <div className="inventory-item">
                <span>Equipment</span>
                <h3>{labelFromId(character.equipment)}</h3>
              </div>
              <div className="inventory-item">
                <span>Accessory</span>
                <h3>{labelFromId(character.accessory)}</h3>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
