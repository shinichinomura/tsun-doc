class OmniauthCallbacksController < ApplicationController
  def twitter
    i18n_scope = [params[:controller], params[:action]]

    provider = 'twitter'
    provider_user_id = request.env['omniauth.auth'][:uid]
    provider_nickname = request.env['omniauth.auth'][:info][:nickname]

    user_auth = UserAuth.where(provider: provider, provider_user_id: provider_user_id).first

    if user_auth.present?
      session[:current_user_id] = user_auth.user_id

      flash[:notice] = I18n.t(:logged_in, scope: i18n_scope)
    else
      User.transaction do
        user = User.create!(
          username: provider_nickname
        )
        user.create_user_auth!(
          provider: provider,
          provider_user_id: provider_user_id
        )
      end

      flash[:notice] = I18n.t(:signed_up, scope: i18n_scope)
    end
    
    redirect_to root_path
  end
end
