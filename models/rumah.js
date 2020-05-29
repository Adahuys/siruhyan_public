'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rumah = sequelize.define('Rumah', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    alamat: DataTypes.STRING,
    jamban: DataTypes.STRING,
    kordinat: DataTypes.STRING,
    no_rumah: DataTypes.STRING,
    rt: DataTypes.STRING,
    rw: DataTypes.STRING,
    sampa: DataTypes.STRING,
    spal: DataTypes.STRING,
    status: DataTypes.STRING,
    kepemilikan: DataTypes.STRING,
    created_at: DataTypes.DATE,
    no_telp: DataTypes.STRING,
    nilai: DataTypes.STRING,
    total_nilai: DataTypes.INTEGER,
    petugas: DataTypes.INTEGER,
    kecamatan: DataTypes.STRING,
    koordinat_kecamatan: DataTypes.STRING,
    kelurahan: DataTypes.STRING,
    koordinat_kelurahan: DataTypes.STRING
  }, {});
  Rumah.associate = function(models) {
    // associations can be defined here
  };
  return Rumah;
};