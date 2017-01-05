class CreateUserAuths < ActiveRecord::Migration[5.0]
  def change
    create_table :user_auths do |t|
      t.references :user, null: false
      t.string :provider, null: false, limit: 16
      t.unsigned_bigint :provider_user_id, null: false

      t.timestamps null: false

      t.index [:provider, :provider_user_id], unique: true
    end

    add_foreign_key :user_auths, :users, on_delete: :cascade, on_update: :cascade
  end
end
