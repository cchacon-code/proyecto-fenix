import { useState } from 'react';

import {
  organizationProfileService,
} from '../index';

import type {
  OrganizationProfile,
} from '../index';

const emptyProfile: OrganizationProfile = {
  id: 'org-profile-main',
  name: '',
  rbd: '',
  dependency: 'Particular Subvencionado',
  director: '',
  utp: '',
  email: '',
  phone: '',
  address: '',
  commune: '',
  region: '',
};

export function OrganizationProfilePanel() {
  const savedProfile =
    organizationProfileService.load();

  const [profile, setProfile] =
    useState<OrganizationProfile>(
      savedProfile ?? emptyProfile,
    );

  const [saved, setSaved] = useState(
    Boolean(savedProfile),
  );

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    organizationProfileService.save(profile);
    setSaved(true);
  }

  return (
    <section className="organization-profile-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            EduOrganization
          </span>

          <h2>Perfil institucional</h2>
        </div>

        <span className="profile-status">
          {saved ? '✅ Guardado' : '⚪ Sin guardar'}
        </span>
      </div>

      <form
        className="organization-profile-form"
        onSubmit={handleSubmit}
      >
        <div className="form-grid">
          <label>
            Nombre del establecimiento
            <input
              required
              value={profile.name}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  name: event.target.value,
                });
              }}
            />
          </label>

          <label>
            RBD
            <input
              required
              value={profile.rbd}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  rbd: event.target.value,
                });
              }}
            />
          </label>

          <label>
            Dependencia
            <select
              value={profile.dependency}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  dependency:
                    event.target.value as OrganizationProfile['dependency'],
                });
              }}
            >
              <option value="Municipal">
                Municipal
              </option>

              <option value="Particular Subvencionado">
                Particular Subvencionado
              </option>

              <option value="Particular Pagado">
                Particular Pagado
              </option>

              <option value="SLEP">
                SLEP
              </option>
            </select>
          </label>

          <label>
            Director(a)
            <input
              value={profile.director}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  director: event.target.value,
                });
              }}
            />
          </label>

          <label>
            Coordinación UTP
            <input
              value={profile.utp}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  utp: event.target.value,
                });
              }}
            />
          </label>

          <label>
            Correo institucional
            <input
              type="email"
              value={profile.email}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  email: event.target.value,
                });
              }}
            />
          </label>

          <label>
            Teléfono
            <input
              value={profile.phone}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  phone: event.target.value,
                });
              }}
            />
          </label>

          <label>
            Dirección
            <input
              value={profile.address}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  address: event.target.value,
                });
              }}
            />
          </label>

          <label>
            Comuna
            <input
              value={profile.commune}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  commune: event.target.value,
                });
              }}
            />
          </label>

          <label>
            Región
            <input
              value={profile.region}
              onChange={(event) => {
                setSaved(false);

                setProfile({
                  ...profile,
                  region: event.target.value,
                });
              }}
            />
          </label>
        </div>

        <button type="submit">
          Guardar perfil institucional
        </button>
      </form>
    </section>
  );
}