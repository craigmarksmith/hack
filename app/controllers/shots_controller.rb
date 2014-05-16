class ShotsController < ApplicationController

  respond_to :json

  def index
    shots = Shot.all
    respond_to do |format|
      format.json { render json: shots, each_serializer: ShotSerializer }
    end
  end

  def create
    shot = Shot.create!(params.permit([:direction]))
    respond_with shot
  end

end
