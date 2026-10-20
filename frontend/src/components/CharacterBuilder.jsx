import React, { useState } from 'react';
import Avatar from './Avatar.jsx';
import { getCharacter, getProfile, saveCharacterAndProfile } from '../utils/core.js';

export default function CharacterBuilder({ onDone }) {
  const [character, setCharacter] = useState(() => getCharacter());
  const [profile, setProfile] = useState(() => getProfile());

  const update = (key, value) => {
    setCharacter((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    saveCharacterAndProfile(character, { role: profile.role || 'Explorer' });
    onDone?.();
  };

  return (
    <form className="character-builder-form" onSubmit={submit}>
      <div className="builder-preview">
        <Avatar size="medium" character={character} />
        <p className="builder-note">Customize your LIFEHUB character.</p>
      </div>

      <input
        value={character.name}
        onChange={(e) => update('name', e.target.value)}
        placeholder="Character name"
      />

      <input
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        placeholder="Role"
      />

      <select value={character.skin} onChange={(e) => update('skin', e.target.value)}>
        <option value="fair">Fair Skin</option>
        <option value="warm">Warm Skin</option>
        <option value="deep">Deep Skin</option>
        <option value="night-skin">Night Skin</option>
        <option value="aurora-skin">Aurora Skin</option>
      </select>

      <select value={character.hair} onChange={(e) => update('hair', e.target.value)}>
        <option value="navy">Navy Hair</option>
        <option value="mint">Mint Hair</option>
        <option value="dark">Dark Hair</option>
      </select>

      <select value={character.outfit} onChange={(e) => update('outfit', e.target.value)}>
        <option value="starter-hoodie">Starter Hoodie</option>
        <option value="mint-hoodie">Mint Hoodie</option>
        <option value="mint-jacket">Mint Jacket</option>
        <option value="night-coat">Night Coat</option>
      </select>

      <select value={character.equipment} onChange={(e) => update('equipment', e.target.value)}>
        <option value="none">No Equipment</option>
        <option value="focus-headset">Focus Headset</option>
        <option value="eco-backpack">Eco Backpack</option>
      </select>

      <select value={character.accessory} onChange={(e) => update('accessory', e.target.value)}>
        <option value="none">No Accessory</option>
        <option value="solar-watch">Solar Watch</option>
      </select>

      <button className="primary-btn full-btn" type="submit">
        Save Character
      </button>
    </form>
  );
}
