/**
 * Created by Valic Chepiha on 01.12.2016.
 */

"use strict";

window.onload = function(){

        if (!String.prototype.trim) {
        (function() {
            String.prototype.trim = function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            };
        })();
    };

    function Cities ( id, country_id, title, desc) {
        this.id = ko.observable( id );
        this.country_id = ko.observable( country_id );
        this.title = ko.observable( title );
        this.desc = ko.observable( desc );
        this.getCity = function(){
            return {
                id : this.id(),
                country_id : this.country_id(),
                title : this.title(),
                desc : this.desc()
            };
        }
    }

    function WorkData(){
        this.master = ko.observableArray( args.master );
        this.slave = ko.observableArray( args.slave );
        this.msSlaveItemTitle = ko.observable();
        this.msSlaveItemDesc = ko.observable();

        this.options = {
            masterid : ko.observable( -1 ),
            slaveid : ko.observable( -1 ),
            addclick : ko.observable( false )
        };

        this.editSlaveValue = {
            title : ko.observable(  ),
            desc : ko.observable(  )
        };

        var self = this;

        this.filterSlave = function ( country ){
            self.options.addclick ( false );
            self.options.masterid ( country.id );
            self.options.slaveid ( -1 );
        };

        this.getMasterId = ko.computed(
            function ( ){ return self.options.masterid(); }
        );

        this.getSlaveId = ko.computed(
            function ( ){ return self.options.slaveid(); }
        );

        this.getAddClick = ko.computed(
            function ( ){ return self.options.addclick(); }
        );

        this.setNullSlaveId = function(){
            self.options.slaveid ( -1 );
        };

        this.setHideAddForm = function(){
            self.options.addclick( false );
        };

        this.setShowAddForm = function(){
            self.options.addclick( true );
        };

        this.getClassActiveItem = function ( country ) {
            return (self.getMasterId() === country.id) ? 'item-active' : '';
        };

        this.itemSlaveTemplate = function ( city ){
            return ( city.id === self.getSlaveId() ) ? 'itemSlaveEdit' : 'itemSlaveShow' ;
        };

        this.clickAdd = function (){
            self.setShowAddForm();
            self.setNullSlaveId();
        };

        this.showAddFrom = ko.computed( function( ){
            return (self.getAddClick()) ? 2 : (self.getMasterId() >0 ) ? 1 : 0;
        }, this);

        this.setAddEmpty = function (){
            self.setHideAddForm();
            self.msSlaveItemTitle( '' );
            self.msSlaveItemDesc( '' );
        };

        this.clickAddCancel = function(){
            self.setAddEmpty();
        };

        this.clickAddSubmit = function(){
            if ( self.msSlaveItemTitle() ){

                var  zntitle =  self.msSlaveItemTitle();
                zntitle = zntitle.trim();
                if( zntitle ){
                    var value = new Cities(self.slave().length+1,
                        self.getMasterId(),
                        self.msSlaveItemTitle(),
                        self.msSlaveItemDesc());
                    self.slave.push( value.getCity() );
                    self.setAddEmpty();
                } else {
                    alert ('Enter info about city');
                }

            } else {
                alert ('Enter info about city');
            }
        };

        this.deleteSlave = function( cities ){
            self.slave.remove( cities );
        };

        this.editSlave = function( city ){
            self.setHideAddForm();
            self.editSlaveValue.title( city.title );
            self.editSlaveValue.desc( city.desc );
            self.options.slaveid ( city.id );
        };

        this.clickCancelEditCity = function(){
            self.setHideAddForm();
            self.setNullSlaveId();
        };

        this.clickSaveEditCity = function ( city ){
            if( self.editSlaveValue.title().trim() ) {
                city.title = self.editSlaveValue.title();
                city.desc = self.editSlaveValue.desc();
                self.setNullSlaveId();
            } else {
                alert('Enter info about city');
            }
        };
    }

    ko.applyBindings(new WorkData());
};
